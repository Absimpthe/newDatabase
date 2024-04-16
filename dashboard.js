document.getElementById('unfulfilled-tab').addEventListener('click', function() {
    setActiveTab('unfulfilled');
});

document.getElementById('accepted-tab').addEventListener('click', function() {
    setActiveTab('accepted');
});

function setActiveTab(tab) {
    var unfulfilledContent = document.getElementById('unfulfilled-orders');
    var acceptedContent = document.getElementById('accepted-orders');
    var unfulfilledTab = document.getElementById('unfulfilled-tab');
    var acceptedTab = document.getElementById('accepted-tab');

    if (tab === 'unfulfilled') {
        unfulfilledContent.style.display = 'block';
        acceptedContent.style.display = 'none';
        unfulfilledTab.classList.add('active');
        acceptedTab.classList.remove('active');
    } else {
        acceptedContent.style.display = 'block';
        unfulfilledContent.style.display = 'none';
        acceptedTab.classList.add('active');
        unfulfilledTab.classList.remove('active');
    }
}

// Initially show unfulfilled orders
setActiveTab('unfulfilled');
