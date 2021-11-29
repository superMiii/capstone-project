const manipulateNavbarLink = (destinationPage, otherPage) => {
    destinationPage.classList.add("active");
    otherPage.classList.remove("active");
};

export default manipulateNavbarLink;
