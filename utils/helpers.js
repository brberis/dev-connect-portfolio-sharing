const clip = require("text-clipper").default;
module.exports = {
  format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
          date
      ).getFullYear()}`;
  },
  format_url: url => {
      return url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  },
  format_plural: (word, amount) => {
      if (amount !== 1) {
          return `${word}s`;
      }

      return word;
  },
  truncate_html: (str, len) => {
    return clip(str, 30, { html: true, maxLines: 2 });
  },
  comment_owner: (commentUsername, username) => {
    if (commentUsername === username) {
      return true
    }
  }
};

