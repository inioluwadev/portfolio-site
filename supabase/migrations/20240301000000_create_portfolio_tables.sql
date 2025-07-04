-- Create the projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies TEXT[],
    link VARCHAR(255),
    image_url VARCHAR(255),
    -- Add other project-specific fields as needed
    CONSTRAINT title_unique UNIQUE (title)
);

-- Create the blog_posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255),
    publication_date DATE,
    -- Add other blog post-specific fields as needed
    CONSTRAINT blog_title_unique UNIQUE (title)
);

-- Create the manifesto table
CREATE TABLE manifesto (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    -- Add other manifesto-specific fields as needed
    CONSTRAINT manifesto_title_unique UNIQUE (title)
);

-- Create the messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    -- Add other message-specific fields as needed
);

-- Create the admin_users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    -- Add other admin user-specific fields as needed
    CONSTRAINT admin_email_unique UNIQUE (email)
);