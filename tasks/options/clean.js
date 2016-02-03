/**
 * Clean options tasks.
 */
module.exports = {
  options: {
    force: true
  },
  build: {
    src: ["<%= build.webserver_root %><%= build.dest %>"]
  },
  deployer: {
    src: ["stanford-jumpstart-deployer"]
  },
  linkyclicky: {
    src: ["linky_clicky"]
  },
  drushpatched: {
    src: ["drush"]
  },
  gitrepos: {
    src: ["stanford-jumpstart-deployer", "linky_clicky", "drush"]
  },
  sitesclone: {
    src: ["<%= sites.webserver_root %><%= build.dest %>"]
  }
};
