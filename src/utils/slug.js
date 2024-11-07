export function makeSlug(title) {
    return title
      .toLowerCase()                      // Convert to lowercase
      .trim()                              // Remove whitespace from both ends
      .replace(/[^\w\s-]/g, '')            // Remove non-alphanumeric characters except hyphens and spaces
      .replace(/\s+/g, '-')                // Replace spaces with hyphens
      .replace(/-+/g, '-');                // Replace multiple hyphens with a single hyphen
  }
  

  