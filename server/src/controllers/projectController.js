import Project from '../models/Project.js';

const slugify = (value) =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const normalizeList = (value) => {
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);
  if (typeof value === 'string') return value.split('\n').join(',').split(',').map((item) => item.trim()).filter(Boolean);
  return [];
};

const buildProjectPayload = (body) => {
  const title = body.title?.trim();
  const slug = body.slug?.trim() || (title ? slugify(title) : undefined);

  return {
    title,
    slug,
    category: body.category?.trim(),
    summary: body.summary?.trim(),
    description: body.description?.trim(),
    coverImage: body.coverImage?.trim(),
    images: normalizeList(body.images),
    tools: normalizeList(body.tools),
    year: Number(body.year),
    featured: Boolean(body.featured),
  };
};

export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';

    const projects = await Project.find(filter).sort({ year: -1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(buildProjectPayload(req.body));
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      buildProjectPayload(req.body),
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
