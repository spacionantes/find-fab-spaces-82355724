CREATE POLICY "Users can read their own leads by email"
ON public.leads
FOR SELECT
TO authenticated
USING (email = auth.email());