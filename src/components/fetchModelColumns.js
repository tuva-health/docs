import yaml from 'js-yaml';

const RAW_BASE_URL = 'https://raw.githubusercontent.com/tuva-health/tuva';
export const DEFAULT_BRANCH = 'input-layer-expectations';

function buildYamlUrl(relativePath, branch = DEFAULT_BRANCH) {
  if (!relativePath) {
    throw new Error('yamlPath must be provided');
  }

  const cleanedPath = relativePath.replace(/^\/+/, '');

  if (!cleanedPath.startsWith('models/')) {
    throw new Error('yamlPath must reside within the "models" directory');
  }

  return `${RAW_BASE_URL}/${branch}/${cleanedPath}`;
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

  const url = buildYamlUrl(yamlPath, branch);
  const response = await fetch(url, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const parsed = yaml.load(await response.text());
  const model = parsed?.models?.find((entry) => entry.name === modelName);

  if (!model || !Array.isArray(model.columns)) {
    throw new Error(`Model "${modelName}" not found in ${yamlPath}`);
  }

  return model.columns.map((column) => ({
    name: column.name,
    type: column.meta?.data_type || column.data_type || '',
    description: normalizeDescription(column.description),
    is_primary_key: column.meta?.is_primary_key === true ? 'Yes' : 'No',
  }));
}

export default fetchModelColumns;
