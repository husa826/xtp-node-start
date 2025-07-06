import request from 'supertest';
import express from 'express';
import { getFilesList } from '../server.js';

// Mock the server for testing
const app = express();
app.use(express.json());

// Add the files endpoint for testing
app.get("/api/files", async (req, reply) => {
  try {
    const workspacePath = process.cwd();
    const files = await getFilesList(workspacePath);
    reply.json({
      success: true,
      files: files
    });
  } catch (error) {
    reply.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

describe('Files API', () => {
  it('should return files list successfully', async () => {
    const response = await request(app)
      .get('/api/files')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.files)).toBe(true);
    expect(response.body.files.length).toBeGreaterThan(0);
  });

  it('should include package.json in the files list', async () => {
    const response = await request(app)
      .get('/api/files')
      .expect(200);

    const packageJsonFile = response.body.files.find((file: any) => 
      file.name === 'package.json' && !file.isDirectory
    );
    
    expect(packageJsonFile).toBeDefined();
    expect(packageJsonFile.path).toBe('package.json');
  });
}); 