import { fetchGraphQL } from './graphql';

export async function getLayoutData() {
  const query = `
    query GetLayout {
      generalSettings {
        title
        description
      }
      headerMenuItems: menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          label
          uri
        }
      }
      footerMenuItems: menuItems(where: { location: FOOTER }) {
        nodes {
          id
          label
          uri
        }
      }
    }
  `;

  // Provide defaults in case menus aren't configured yet
  try {
    const data = await fetchGraphQL(query);
    return {
      generalSettings: data.generalSettings || { title: 'Ahaaq Auto Exchange', description: '' },
      headerMenu: data.headerMenuItems?.nodes || [],
      footerMenu: data.footerMenuItems?.nodes || [],
    };
  } catch (err) {
    console.error('Failed to get layout data:', err);
    return {
      generalSettings: { title: 'Ahaaq Auto Exchange', description: '' },
      headerMenu: [],
      footerMenu: [],
    };
  }
}
