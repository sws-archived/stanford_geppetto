/**
 * Clean options tasks.
 */
module.exports = {
  options: {
    force: true
  },
  build: {
    src: ["<%= build.webserver_root %><%= build.dest %>"]
  }
};
