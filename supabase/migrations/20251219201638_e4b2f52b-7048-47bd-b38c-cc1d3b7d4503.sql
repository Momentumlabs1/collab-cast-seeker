-- Add UPDATE policy for applications table so admin can change status
CREATE POLICY "Allow status updates" 
ON public.applications 
FOR UPDATE 
USING (true)
WITH CHECK (true);