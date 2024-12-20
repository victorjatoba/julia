import express, { Request, Response, NextFunction } from 'express';
import { authRouter } from './routes/auth.routes';
import { dataRouter } from './routes/data.routes';
import { renderHtml } from './utils/renderHtml';

const app = express();

// Mount routers
app.use(authRouter);
app.use(dataRouter);

// Global error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled error:', err.stack || err.message);
    res.status(500).send(renderHtml('Error', 'An unexpected error occurred.'));
});

export { app }; // Export the app instance for testing

// Start the server
if (require.main === module) {
    const PORT: number = parseInt(process.env.PORT || '3000', 10);
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}