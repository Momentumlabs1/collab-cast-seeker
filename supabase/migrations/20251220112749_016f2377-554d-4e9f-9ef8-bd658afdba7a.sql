-- Create referrals table for the €200 bonus system
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  referrer_name TEXT NOT NULL,
  referrer_contact TEXT NOT NULL,
  referred_name TEXT NOT NULL,
  referred_contact TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert and admin read/update
CREATE POLICY "Anyone can submit referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow read access for referrals" 
ON public.referrals 
FOR SELECT 
USING (true);

CREATE POLICY "Allow status updates for referrals" 
ON public.referrals 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_referrals_updated_at
BEFORE UPDATE ON public.referrals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add file_urls column to applications table to store uploaded file URLs
ALTER TABLE public.applications 
ADD COLUMN file_urls TEXT[] DEFAULT '{}';

-- Create storage bucket for application files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('application-files', 'application-files', true);

-- Create storage policies for application files
CREATE POLICY "Anyone can upload application files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'application-files');

CREATE POLICY "Anyone can view application files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'application-files');