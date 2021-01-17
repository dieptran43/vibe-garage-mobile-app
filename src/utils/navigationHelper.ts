export const getScreenParent = (route: String) => {
  let parent;
  let isDrawerStack =
    route === 'Discover' ||
    route === 'LatestMusic' ||
    route === 'TopMusic' ||
    route === 'Spotlight' ||
    route === 'Genres' ||
    route === 'Playlists' ||
    route === 'Browse' ||
    route === 'Purchased' ||
    route === 'RecentlyPlayed' ||
    route === 'MyPlaylists' ||
    route === 'Favourites';

  let isSingleStack = route === 'SignIn' || route === 'SignUp';

  if (isDrawerStack) {
    parent = 'DrawerStack';
  } else if (isSingleStack) {
    parent = 'SingleStack';
  }
  return parent;
};
