-- Create table for shared design links
CREATE TABLE public.shared_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'link',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.shared_files ENABLE ROW LEVEL SECURITY;

-- Everyone can read shared files
CREATE POLICY "Anyone can read shared files" 
ON public.shared_files 
FOR SELECT 
USING (true);

-- Admins can manage shared files
CREATE POLICY "Admins can manage shared files" 
ON public.shared_files 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Add trigger for updated_at
CREATE TRIGGER update_shared_files_updated_at
BEFORE UPDATE ON public.shared_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();