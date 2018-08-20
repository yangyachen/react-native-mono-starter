const findRoot = require('find-root');
const fs = require('fs');
const path = require('path');

const link = (name, fromBase, toBase) => {
  const from = path.join(fromBase, 'node_modules', name);
  const to = path.join(toBase, 'node_modules', name);

  if (fs.existsSync(to)) {
    fs.unlinkSync(to);
  }

  fs.symlinkSync(from, to, 'dir');
};

function makeSymlinks(lib, from) {
  const root = findRoot(from, dir => {
    const pkg = path.join(dir, 'package.json');
    return fs.existsSync(pkg) && 'workspaces' in require(pkg);
  });

  link(lib, root, from);
};

const from = path.resolve('.'); 
makeSymlinks('react-native', from);
