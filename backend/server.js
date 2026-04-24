const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());

const applicationsCollection = db.collection('applications');

app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running' });
});

app.get('/api/applications', async (req, res) => {
  const snapshot = await applicationsCollection.orderBy('createdAt', 'desc').get();

  const applications = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.json(applications);
});

app.post('/api/applications', async (req, res) => {
  const newApplication = {
    company: req.body.company,
    role: req.body.role,
    status: req.body.status,
    dateApplied: req.body.dateApplied,
    location: req.body.location,
    notes: req.body.notes || '',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const docRef = await applicationsCollection.add(newApplication);

  res.status(201).json({
    id: docRef.id,
    ...newApplication,
    createdAt: new Date().toISOString(),
  });
});

app.put('/api/applications/:id', async (req, res) => {
  const { id } = req.params;

  const updatedApplication = {
    company: req.body.company,
    role: req.body.role,
    status: req.body.status,
    dateApplied: req.body.dateApplied,
    location: req.body.location,
    notes: req.body.notes || '',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await applicationsCollection.doc(id).update(updatedApplication);

  res.json({
    id,
    ...updatedApplication,
    updatedAt: new Date().toISOString(),
  });
});

app.delete('/api/applications/:id', async (req, res) => {
  const { id } = req.params;

  await applicationsCollection.doc(id).delete();

  res.json({ message: 'Application deleted successfully' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});