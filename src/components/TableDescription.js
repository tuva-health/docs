import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const RAW_BASE_URL = 'https://raw.githubusercontent.com/tuva-health/tuva';
const DEFAULT_BRANCH = 'main';
const DEFAULT_YAML_PATH = 'models/core/core_models.yml';

function buildYamlUrl(relativePath, branch) {
  if (!relativePath) {
    throw new Error('yamlPath must be provided');
  }

  const cleanedPath = relativePath.replace(/^\/+/, '');

  if (!cleanedPath.startsWith('models/')) {
    throw new Error('yamlPath must reside within the "models" directory');
  }

  const safeBranch = branch || DEFAULT_BRANCH;
  return `${RAW_BASE_URL}/${safeBranch}/${cleanedPath}`;
}

async function loadModelDescription(modelName, yamlPath, branch) {
  const url = buildYamlUrl(yamlPath, branch);
  const response = await fetch(url, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const parsed = yaml.load(await response.text());
  const model = parsed?.models?.find((entry) => entry.name === modelName);

  if (!model || !model.description) {
    throw new Error(`Model "${modelName}" not found in ${yamlPath}`);
  }

  return model.description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ');
}

export function TableDescription({
  modelName,
  yamlPath = DEFAULT_YAML_PATH,
  branch = DEFAULT_BRANCH,
}) {
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return undefined;
    }

    let isMounted = true;

    loadModelDescription(modelName, yamlPath, branch)
      .then((text) => {
        if (isMounted) {
          setDescription(text);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [modelName, yamlPath, branch]);

  if (error) {
    return <p role="alert">Unable to load description: {error}</p>;
  }

  return description ? <p>{description}</p> : null;
}

export default TableDescription;
