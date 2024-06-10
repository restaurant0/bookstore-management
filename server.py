from backend.app import app
import subprocess
import os

if __name__ == '__main__':
    # Start the backend Flask server
    flask_process = subprocess.Popen(['flask', 'run'])

    # Start the frontend Next.js server
    frontend_path = os.path.join(os.getcwd(), 'frontend')
    next_process = subprocess.Popen(['npm', 'run', 'dev'], cwd=frontend_path)

    # Wait for both processes to complete
    flask_process.wait()
    next_process.wait()
