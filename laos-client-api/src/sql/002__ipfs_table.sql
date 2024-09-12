CREATE TABLE api_ipfs_upload (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL,
    ipfs_hash VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES api_client(id)
);

CREATE INDEX idx_ipfs_upload_client_id ON api_ipfs_upload(client_id);
CREATE INDEX idx_ipfs_upload_ipfs_hash ON api_ipfs_upload(ipfs_hash);
CREATE INDEX idx_ipfs_upload_status ON api_ipfs_upload(status);
