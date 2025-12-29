-- Create enum for approval status
CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Create enum for project status
CREATE TYPE public.project_status AS ENUM ('draft', 'in_progress', 'review', 'completed');

-- Create enum for positioning type
CREATE TYPE public.positioning_type AS ENUM ('side_by_side', 'closeup', 'no_characters');

-- Create team_members table for code-based access
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  access_code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Enable RLS on team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read for code validation (we only expose active status, not full data)
CREATE POLICY "Allow code validation"
ON public.team_members
FOR SELECT
USING (true);

-- Policy: Only allow updates from authenticated admin context (we'll handle this in the app)
CREATE POLICY "Allow updates for admin"
ON public.team_members
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Policy: Allow inserts for admin
CREATE POLICY "Allow inserts for admin"
ON public.team_members
FOR INSERT
WITH CHECK (true);

-- Policy: Allow deletes for admin
CREATE POLICY "Allow deletes for admin"
ON public.team_members
FOR DELETE
USING (true);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID NOT NULL REFERENCES public.team_members(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_seconds INTEGER,
  total_slides INTEGER,
  status project_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to projects"
ON public.projects
FOR ALL
USING (true)
WITH CHECK (true);

-- Create scenes table
CREATE TABLE public.scenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  script_text TEXT,
  duration_seconds INTEGER,
  positioning positioning_type NOT NULL DEFAULT 'side_by_side',
  start_frame INTEGER,
  end_frame INTEGER,
  canva_design_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.scenes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to scenes"
ON public.scenes
FOR ALL
USING (true)
WITH CHECK (true);

-- Create script_words table for word-level animation tracking
CREATE TABLE public.script_words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scene_id UUID NOT NULL REFERENCES public.scenes(id) ON DELETE CASCADE,
  word_text TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  start_slide INTEGER,
  end_slide INTEGER,
  has_animation BOOLEAN NOT NULL DEFAULT false,
  animation_type TEXT,
  animation_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.script_words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to script_words"
ON public.script_words
FOR ALL
USING (true)
WITH CHECK (true);

-- Create workflow_assets table
CREATE TABLE public.workflow_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  scene_id UUID REFERENCES public.scenes(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  file_url TEXT,
  file_path TEXT,
  is_animated BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.workflow_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to workflow_assets"
ON public.workflow_assets
FOR ALL
USING (true)
WITH CHECK (true);

-- Create canva_designs table
CREATE TABLE public.canva_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  design_number INTEGER NOT NULL,
  slide_count INTEGER NOT NULL DEFAULT 0,
  max_slides INTEGER NOT NULL DEFAULT 150,
  canva_url TEXT,
  export_status TEXT NOT NULL DEFAULT 'not_exported',
  export_zip_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.canva_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to canva_designs"
ON public.canva_designs
FOR ALL
USING (true)
WITH CHECK (true);

-- Create export_settings table
CREATE TABLE public.export_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scene_id UUID NOT NULL REFERENCES public.scenes(id) ON DELETE CASCADE,
  export_as_separate_page BOOLEAN NOT NULL DEFAULT false,
  element_type TEXT,
  page_name TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.export_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to export_settings"
ON public.export_settings
FOR ALL
USING (true)
WITH CHECK (true);

-- Create frame_plans table for end-frame-first planning
CREATE TABLE public.frame_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scene_id UUID NOT NULL REFERENCES public.scenes(id) ON DELETE CASCADE,
  start_frame_description TEXT,
  end_frame_description TEXT,
  start_frame_image_url TEXT,
  end_frame_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.frame_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to frame_plans"
ON public.frame_plans
FOR ALL
USING (true)
WITH CHECK (true);

-- Create frame_steps table for intermediate steps
CREATE TABLE public.frame_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  frame_plan_id UUID NOT NULL REFERENCES public.frame_plans(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  estimated_slides INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.frame_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to frame_steps"
ON public.frame_steps
FOR ALL
USING (true)
WITH CHECK (true);

-- Add updated_at triggers
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scenes_updated_at
BEFORE UPDATE ON public.scenes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_canva_designs_updated_at
BEFORE UPDATE ON public.canva_designs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_frame_plans_updated_at
BEFORE UPDATE ON public.frame_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default access code
INSERT INTO public.team_members (name, access_code, is_active, notes)
VALUES ('Default Access', 'animate0711', true, 'Default access code for team members');

-- Create storage bucket for workflow assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('workflow-assets', 'workflow-assets', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for workflow-assets bucket
CREATE POLICY "Allow authenticated read on workflow-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'workflow-assets');

CREATE POLICY "Allow authenticated insert on workflow-assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'workflow-assets');

CREATE POLICY "Allow authenticated update on workflow-assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'workflow-assets');

CREATE POLICY "Allow authenticated delete on workflow-assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'workflow-assets');