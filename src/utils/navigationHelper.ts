export const getScreenParent = (route: string) => {
  let parent;
  let drawerStack = [
    'Discover',
    'LatestMusic',
    'TopMusic',
    'Spotlight',
    'Genres',
    'Playlists',
    'Browse',
    'Purchased',
    'RecentlyPlayed',
    'MyPlaylists',
    'Favourites',
    'GetCredit',
    'BecomeAnArtist',
    'Upload',
    'Dashboard',
    'Track',
    'MyPlatform',
    'Profile',
    'SubscribeToPremium',
  ];

  let singleStack = ['Login', 'SignUp'];

  if (drawerStack.includes(route)) {
    parent = 'DrawerStack';
  } else if (singleStack.includes(route)) {
    parent = 'SingleStack';
  }
  return parent;
};
