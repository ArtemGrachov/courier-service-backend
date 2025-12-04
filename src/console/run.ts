const createAdminBootstrap = () => import('./scripts/create-admin/bootstrap.js').then(m => m.default.default);
const updateAdminBootstrap = () => import('./scripts/update-admin/bootstrap.js').then(m => m.default.default);
const deleteAdminBootstrap = () => import('./scripts/delete-admin/bootstrap.js').then(m => m.default.default);

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
    case 'delete-admin': {
      scriptLoader = deleteAdminBootstrap;
      break;
    }
  }

  if (!scriptLoader) {
    if (scriptName) {
      console.error(`Incorrect script name ${scriptName}`);
      return;
    }

    console.error(`Script ${scriptName} not found`);
    return;
  }

  const script = await scriptLoader();
  script();
}

run();

