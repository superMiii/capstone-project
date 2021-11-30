const manipulateNavbarLink = (destinationPage, allNavLink) => {
    for (let i = 0; i < allNavLink.length; i++) {
        if ( allNavLink[i] == destinationPage ) {
            allNavLink[i].classList.add('active');
        }else{
            allNavLink[i].classList.remove('active');
        };
    };
};

export default manipulateNavbarLink;
