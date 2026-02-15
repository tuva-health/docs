import yaml from 'js-yaml';

const RAW_BASE_URLS = [
  'https://raw.githubusercontent.com/tuva-health/the_tuva_project',
  'https://raw.githubusercontent.com/tuva-health/tuva',
];
export const DEFAULT_BRANCH = 'main';
const YAML_LOAD_OPTIONS = { json: true };

function normalizeYamlPath(relativePath) {
  if (!relativePath) {
    throw new Error('yamlPath must be provided');
  }

  const cleanedPath = relativePath.replace(/^\/+/, '');

  if (!cleanedPath.startsWith('models/')) {
    throw new Error('yamlPath must reside within the "models" directory');
  }

  return cleanedPath;
}

export async function fetchYamlFile(yamlPath, branch = DEFAULT_BRANCH) {
  const cleanedPath = normalizeYamlPath(yamlPath);
  let lastError;

  for (const baseUrl of RAW_BASE_URLS) {
    const url = `${baseUrl}/${branch}/${cleanedPath}`;

    try {
      const response = await fetch(url, { cache: 'no-cache' });
      if (!response.ok) {
        lastError = new Error(`Failed to fetch ${url}: ${response.status}`);
        continue;
      }

      return {
        text: await response.text(),
        url,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error(`Failed to fetch ${cleanedPath} from all configured sources`);
}

function normalizeDescription(text) {
  if (!text) {
    return '';
  }

  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ');
}

export async function fetchModelColumns({ modelName, yamlPath, branch = DEFAULT_BRANCH }) {
  if (!modelName) {
    throw new Error('modelName must be provided');
  }

  const { text } = await fetchYamlFile(yamlPath, branch);
  const parsed = yaml.load(text, YAML_LOAD_OPTIONS);
  const model = parsed?.models?.find((entry) => entry.name === modelName);

  if (!model || !Array.isArray(model.columns)) {
    throw new Error(`Model "${modelName}" not found in ${yamlPath}`);
  }

  return model.columns.map((column) => ({
    name: column.name,
    type: column.config?.meta?.data_type || column.meta?.data_type || column.data_type || '',
    description: normalizeDescription(column.description),
    is_primary_key:
      column.config?.meta?.is_primary_key === true || column.meta?.is_primary_key === true
        ? 'Yes'
        : 'No',
  }));
}

export default fetchModelColumns;
