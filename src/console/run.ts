const createAdminBootstrap = () => import('./scripts/create-admin/bootstrap.js').then(m => m.default.default);
const updateAdminBootstrap = () => import('./scripts/update-admin/bootstrap.js').then(m => m.default.default);

async function run() {
  const scriptName = process.argv[2];
  let scriptLoader: (() => Promise<any>) | null = null;

  switch (scriptName) {
    case 'create-admin': {
      scriptLoader = createAdminBootstrap;
      break;
    }
    case 'update-admin': {
      scriptLoader = updateAdminBootstrap;
      break;
    }
  }

  if (!scriptLoader) {
    if (scriptName) {
      throw new Error(`Incorrect script name ${scriptName}`);
    }

    throw new Error(`Script ${scriptName} not found`);
  }

  const script = await scriptLoader();
  script();
}

run();

