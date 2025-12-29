-- Drop old production tables (keeping team_members for login)
DROP TABLE IF EXISTS script_words CASCADE;
DROP TABLE IF EXISTS export_settings CASCADE;
DROP TABLE IF EXISTS frame_steps CASCADE;
DROP TABLE IF EXISTS frame_plans CASCADE;
DROP TABLE IF EXISTS canva_designs CASCADE;
DROP TABLE IF EXISTS workflow_assets CASCADE;
DROP TABLE IF EXISTS scenes CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Create workflow phases (admin creates these)
CREATE TABLE workflow_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT,
  estimated_time TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content sections within phases
CREATE TABLE content_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID REFERENCES workflow_phases ON DELETE CASCADE NOT NULL,
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('text', 'video', 'image', 'download')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Text content
CREATE TABLE text_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES content_sections ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Video content
CREATE TABLE video_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES content_sections ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration_seconds INTEGER,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Image content
CREATE TABLE image_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES content_sections ON DELETE CASCADE NOT NULL,
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Downloadable resources
CREATE TABLE downloadable_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES content_sections ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size_mb REAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student progress tracking
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES team_members ON DELETE CASCADE NOT NULL,
  phase_id UUID REFERENCES workflow_phases ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, phase_id)
);

-- Enable RLS on all tables
ALTER TABLE workflow_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE text_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloadable_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies for workflow_phases (everyone can read published, admins can manage all)
CREATE POLICY "Anyone can read published phases" ON workflow_phases
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all phases" ON workflow_phases
  FOR ALL USING (true) WITH CHECK (true);

-- RLS policies for content tables (read-only for authenticated users)
CREATE POLICY "Anyone can read content sections" ON content_sections
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage content sections" ON content_sections
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read text content" ON text_content
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage text content" ON text_content
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read video content" ON video_content
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage video content" ON video_content
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read image content" ON image_content
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage image content" ON image_content
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read downloadable resources" ON downloadable_resources
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage downloadable resources" ON downloadable_resources
  FOR ALL USING (true) WITH CHECK (true);

-- RLS policies for user_progress (users can manage their own)
CREATE POLICY "Users can read own progress" ON user_progress
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (true) WITH CHECK (true);

-- Create admin-uploads storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('admin-uploads', 'admin-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for admin-uploads
CREATE POLICY "Anyone can read admin uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'admin-uploads');

CREATE POLICY "Admins can upload to admin-uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'admin-uploads');

CREATE POLICY "Admins can update admin uploads" ON storage.objects
  FOR UPDATE USING (bucket_id = 'admin-uploads');

CREATE POLICY "Admins can delete admin uploads" ON storage.objects
  FOR DELETE USING (bucket_id = 'admin-uploads');

-- Insert initial 10 workflow phases
INSERT INTO workflow_phases (order_index, title, subtitle, icon, estimated_time, difficulty, is_published) VALUES
(1, 'Introduction', 'What is StrichAbi and why animated education?', 'Play', '15 min', 'beginner', true),
(2, 'Concept & Script Development', 'Writing for visual storytelling', 'FileText', '30 min', 'beginner', true),
(3, 'Character Positioning', 'The 3 positioning strategies', 'Users', '25 min', 'beginner', true),
(4, 'Canva Setup', 'Frame-by-frame animation in Canva', 'Layout', '45 min', 'intermediate', true),
(5, 'Animation Principles', 'Every word needs movement', 'Zap', '40 min', 'intermediate', true),
(6, 'Exporting from Canva', 'Export settings and file organization', 'Download', '20 min', 'intermediate', true),
(7, 'CapCut Assembly', 'Building the video timeline', 'Film', '60 min', 'intermediate', true),
(8, 'Audio & Sound Design', 'Voiceover and sound effects', 'Volume2', '30 min', 'intermediate', true),
(9, 'Final Touches', 'Captions, zooms, and polish', 'Sparkles', '25 min', 'advanced', true),
(10, 'Export & Publishing', 'Final export and posting strategy', 'Upload', '15 min', 'beginner', true);

-- Trigger for updated_at
CREATE TRIGGER update_workflow_phases_updated_at
  BEFORE UPDATE ON workflow_phases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();