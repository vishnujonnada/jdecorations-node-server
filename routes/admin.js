const express = require('express');
const multer = require('multer');
const Decoration = require('../models/Decoration');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/decorations', async (req, res) => {
    try {
      const decorations = await Decoration.find();
      res.status(200).json(decorations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Update a decoration
router.put('/decorations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDecoration = await Decoration.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedDecoration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  
router.post('/add-decoration', upload.array('decoration_images'), async (req, res) => {
  const { decoration_type, decoration_cost, contact_details } = req.body;
  const decoration_images = req.files.map(file => file.path);

  console.log('Received data:', req.body);

  try {
    // Find the last decoration_id and increment it
    const lastDecoration = await Decoration.findOne().sort('-decoration_id');
    const newDecorationId = lastDecoration ? lastDecoration.decoration_id + 1 : 1;

    const decoration = new Decoration({
      decoration_id: newDecorationId,
      decoration_type,
      decoration_cost,
      decoration_images,
      contact_details,
    });

    await decoration.save();
    res.status(201).json({ message: 'Decoration added successfully' });
  } catch (error) {
    console.error('Error adding decoration:', error);
    res.status(400).json({ error: error.message });
  }
});


// router.post('/add-decoration', async (req, res) => {
//   try {
//     const { decoration_type, decoration_cost, decoration_images, contact_details } = req.body;
//     const decoration = new Decoration({
//       decoration_type,
//       decoration_cost,
//       decoration_images,
//       contact_details
//     });

//     await decoration.save();
//     res.status(201).json({ message: 'Decoration added successfully', decoration });
//   } catch (error) {
//     res.status(400).json({ message: 'Error adding decoration', error });
//   }
// });


// Update decoration
router.put('/decorations/:id', async (req, res) => {
  const { id } = req.params;
  const { decoration_type, decoration_cost, contact_details } = req.body;
  try {
    const decoration = await Decoration.findByIdAndUpdate(id, {
      decoration_type,
      decoration_cost,
      contact_details
    }, { new: true });
    res.json(decoration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete decoration
router.delete('/decorations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Decoration.findByIdAndDelete(id);
    res.json({ message: 'Decoration deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
