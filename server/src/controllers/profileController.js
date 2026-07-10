import Profile from '../models/Profile.js';

const normalizeList = (value) => {
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);
  if (typeof value === 'string') return value.split('\n').join(',').split(',').map((item) => item.trim()).filter(Boolean);
  return [];
};

const buildProfilePayload = (body) => ({
  name: body.name?.trim(),
  tagline: body.tagline?.trim(),
  bio: body.bio?.trim(),
  education: body.education?.trim(),
  location: body.location?.trim(),
  skills: normalizeList(body.skills),
  avatarUrl: body.avatarUrl?.trim(),
  resumeUrl: body.resumeUrl?.trim(),
  social: {
    email: body.social?.email?.trim(),
    instagram: body.social?.instagram?.trim(),
    linkedin: body.social?.linkedin?.trim(),
    behance: body.social?.behance?.trim(),
  },
});

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const existingProfile = await Profile.findOne();
    const payload = buildProfilePayload(req.body);
    const profile = existingProfile
      ? await Profile.findByIdAndUpdate(existingProfile._id, payload, { new: true, runValidators: true })
      : await Profile.create(payload);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
