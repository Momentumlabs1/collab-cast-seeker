-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  selected_account TEXT NOT NULL,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  instagram TEXT,
  whatsapp TEXT,
  tools TEXT[] DEFAULT '{}',
  other_tool TEXT,
  experience TEXT,
  portfolio_links TEXT[] DEFAULT '{}',
  contact_preference TEXT NOT NULL DEFAULT 'instagram',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (public form)
CREATE POLICY "Anyone can submit applications" 
ON public.applications 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view applications (for now, allow all reads for testing)
CREATE POLICY "Allow read access for testing" 
ON public.applications 
FOR SELECT 
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();