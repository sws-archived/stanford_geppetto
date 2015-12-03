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
  gitrepos: {
    src: ["stanford-jumpstart-deployer", "linky_clicky"]
  },
  sitesclone: {
    src: ["<%= sites.webserver_root %><%= sites.dest %>"]
  }
};
