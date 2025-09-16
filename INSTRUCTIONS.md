# Supabase Setup Instructions

Follow these steps to configure the application to use your own Supabase backend for data persistence and user authentication.

**IMPORTANT NOTE:** This application uses **Supabase Storage** to store user data as individual JSON files in a bucket. It does **not** use the traditional Supabase Postgres database tables. The instructions below are for setting up the Storage Bucket and its security policies.

## Step 1: Create a Supabase Project

1.  Go to [supabase.com](https://supabase.com) and create an account or sign in.
2.  On your dashboard, click "New project".
3.  Choose an organization, give your project a name (e.g., `big-gestor`), and generate a secure database password.
4.  Select a region closest to you and click "Create new project".
5.  Wait for your project to be set up.

## Step 2: Configure Environment Variables

The application needs your project's URL and `anon` key to connect to Supabase.

1.  In your Supabase project dashboard, go to **Project Settings** (the gear icon in the left sidebar).
2.  Click on the **API** tab.
3.  You will find your **Project URL** and your Project API key (`anon` `public`).
4.  You need to set these as environment variables for the application. The application expects the following variables:
    *   `SUPABASE_URL`: Your Project URL.
    *   `SUPABASE_ANON_KEY`: Your `anon` (public) key.

    *How you set these depends on your deployment environment (e.g., Vercel, Netlify, or a local `.env` file). You must configure them for the application to work.*

## Step 3: Set up Storage & Security Policies

The application uses Supabase Storage to save each user's data (jobs, clients, etc.) as JSON files.

### 1. Create a Storage Bucket

1.  In your Supabase dashboard, go to **Storage** (the file icon in the left sidebar).
2.  Click **New bucket**.
3.  Enter the bucket name as `user-data`.
4.  Toggle the **Public bucket** switch to **ON**. This is necessary for the security policies to work correctly.
5.  Click **Create bucket**.

### 2. Create Security Policies for the Bucket

For security, we need to create policies that control who can access files. These policies ensure users can only access their own data.

1.  In the Supabase dashboard, go to the **SQL Editor** (the `<>` icon).
2.  Click **+ New query**.
3.  Copy and paste the entire SQL script below into the editor and click **RUN**. This will create all the necessary policies.

```sql
-- Allow authenticated users to view the public user list for the team feature
CREATE POLICY "Allow authenticated read access to user list"
ON storage.objects FOR SELECT
TO authenticated
USING ( bucket_id = 'user-data' AND name = 'system_data/users.json' );

-- Allow users to view files only within their own folder (folder name is their user ID)
CREATE POLICY "Allow individual user read access"
ON storage.objects FOR SELECT
TO authenticated
USING ( bucket_id = 'user-data' AND (storage.foldername(name))[1] = auth.uid()::text );

-- Allow users to upload files only into their own folder
CREATE POLICY "Allow individual user upload access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'user-data' AND (storage.foldername(name))[1] = auth.uid()::text );

-- Allow users to update files only within their own folder
CREATE POLICY "Allow individual user update access"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'user-data' AND (storage.foldername(name))[1] = auth.uid()::text );

-- Allow users to delete files only within their own folder
CREATE POLICY "Allow individual user delete access"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'user-data' AND (storage.foldername(name))[1] = auth.uid()::text );
```

## Step 4: Configure Authentication

1.  In your Supabase dashboard, go to **Authentication** (the users icon).
2.  Under the **Providers** section, ensure that **Email** is enabled. It is enabled by default.
3.  **For development:** To make testing easier, you might want to disable email confirmation. Go to the **Settings** tab within the Authentication section and turn **OFF** the "Confirm email" toggle.
4.  **For production:** Keep "Confirm email" **ON**. Users will receive an email to verify their account before they can log in.

## Step 5: You're Ready!

Once you have configured the environment variables and set up the Supabase bucket and policies, the application is ready to use. You can now register your first user account and start managing your projects.

## Step 6: Create Your First User (Admin Account)

To get started quickly and for easy testing, you can create a simple admin account. The application's registration form requires a password of at least 6 characters.

1.  Launch the application.
2.  Go to the **Register** page.
3.  Create a new user with the following credentials:
    *   **Username:** `admin`
    *   **Email:** `admin@example.com` (or any other valid email)
    *   **Password:** `admin123`
4.  Log in with these credentials. The application will automatically populate your account with sample data for you to explore.
