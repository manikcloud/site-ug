# AWS User Group Site V5.1 - Clean Release
FROM nginx:alpine

# Set maintainer and version info
LABEL maintainer="AWS User Group Mississauga <awsusergroup.mississauga@gmail.com>"
LABEL description="AWS User Group Mississauga Website V5.1 - Clean Release (removed unused events folder)"
LABEL version="5.1"

# Copy website files to nginx html directory
COPY . /usr/share/nginx/html/

# Remove unnecessary files
RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/README.md \
    /usr/share/nginx/html/docker-compose.yml \
    /usr/share/nginx/html/*.sh

# Create optimized nginx configuration
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Enable gzip compression \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml; \
    \
    # Cache static assets \
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
        add_header Vary "Accept-Encoding"; \
    } \
    \
    # Handle all routes \
    location / { \
        try_files $uri $uri/ /index.html; \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
    } \
    \
    # Security headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    add_header Referrer-Policy "no-referrer-when-downgrade" always; \
    add_header Content-Security-Policy "default-src '\''self'\'' https: data: blob: '\''unsafe-inline'\'' '\''unsafe-eval'\''; font-src '\''self'\'' https: data:;" always; \
    \
    # Remove server signature \
    server_tokens off; \
}' > /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
