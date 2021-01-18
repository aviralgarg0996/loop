 
export default class Navigation{
    static DISCOVERY: NavItem[] = [
        {
            title: 'Home',
            route: '/discovery/home',
            className: "icon icon-home",
            hasChild: false
        },
        {
            title: 'Recommended',
            route: '/discovery/recommended',
            className: "icon icon-recommended",
            hasChild: false
        },
        {
            title: 'Genre',
            route: '/discovery/genre',
            className: "icon icon-genre",
            hasChild: false
        },
        {
            title: 'Area of expertise',
            route: '/discovery/expertise',
            className: "icon icon-expertise",
            hasChild: false
        },
        {
            title: 'Recently joined',
            route: '/discovery/recent',
            className: "icon icon-joined",
            hasChild: false
        },
        {
            title: 'Location',
            route: '/discovery/location',
            className: "icon icon-location",
            hasChild: false
        },
        {
            title: 'Trending',
            route: '/discovery/trending',
            className: "icon icon-trending",
            hasChild: false
        },
        {
            title: 'My Network',
            route: '/hub/my-network',
            className: "icon icon-network",
            hasChild: false
        },
    ]
    static HUB: NavItem[] = [
        {
            title: 'Home',
            route: '/hub/home',
            className: "icon icon-home",
            hasChild: false
        },
        {
            title: 'Studio',
            route: '/hub/studio',
            className: "icon icon-music",
            hasChild: false
        },
        {
            title: 'My Network',
            route: '/hub/my-network',
            className: "icon icon-network",
            hasChild: false
        },
        {
            title: 'Settings',
            className: "icon icon-user-cog",
            route: '/hub/view-profile',
            hasChild: true,
            isOpened: false,
            onClick: function ():  NavItem[] {
                this.isOpened = !this.isOpened;
                return Navigation.HUB
             },
            child: [
                {
                    title: 'Terms and conditions',
                    route: '/hub/settings/terms-and-condition',
                    className: "icon icon-terms",
                    hasChild: false
                },
                {
                    title: 'Privacy Policy',
                    route: '/hub/settings/privacy-policy',
                    className: "icon icon-policy",
                    hasChild: false
                },
                {
                    title: 'Terms of Services',
                    route: '/hub/settings/terms-services',
                    className: "icon icon-services",
                    hasChild: false
                }
            ]
        }
    ]
}

interface NavItem {
    title: string,
    route: string,
    className: string,
    hasChild: boolean,
    child?: NavItem[],
    onClick?():  NavItem[];
    isOpened?: boolean
}