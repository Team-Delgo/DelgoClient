var MARKER_ICON_URL = './img/sp_pins_spot_v3.png';
var MARKER_HIGHLIGHT_ICON_URL = './img/sp_pins_spot_v3_over.png';
var COLORS = ['#45ABD9', '#6154B6', '#E43736', '#44AE3F', '#F6D200', '#344554'];

var MARKER_SPRITE_X_OFFSET = 29;
var MARKER_SPRITE_Y_OFFSET = 50;

var MARKER_SPRITE_POSITION = {

    "A0": [0, 0],
    "B0": [MARKER_SPRITE_X_OFFSET, 0],
    "C0": [MARKER_SPRITE_X_OFFSET*2, 0],
    "D0": [MARKER_SPRITE_X_OFFSET*3, 0],
    "E0": [MARKER_SPRITE_X_OFFSET*4, 0],
    "F0": [MARKER_SPRITE_X_OFFSET*5, 0],
    "G0": [MARKER_SPRITE_X_OFFSET*6, 0],
    "H0": [MARKER_SPRITE_X_OFFSET*7, 0],
    "I0": [MARKER_SPRITE_X_OFFSET*8, 0],

    "A1": [0, MARKER_SPRITE_Y_OFFSET],
    "B1": [MARKER_SPRITE_X_OFFSET, MARKER_SPRITE_Y_OFFSET],
    "C1": [MARKER_SPRITE_X_OFFSET*2, MARKER_SPRITE_Y_OFFSET],
    "D1": [MARKER_SPRITE_X_OFFSET*3, MARKER_SPRITE_Y_OFFSET],
    "E1": [MARKER_SPRITE_X_OFFSET*4, MARKER_SPRITE_Y_OFFSET],
    "F1": [MARKER_SPRITE_X_OFFSET*5, MARKER_SPRITE_Y_OFFSET],
    "G1": [MARKER_SPRITE_X_OFFSET*6, MARKER_SPRITE_Y_OFFSET],
    "H1": [MARKER_SPRITE_X_OFFSET*7, MARKER_SPRITE_Y_OFFSET],
    "I1": [MARKER_SPRITE_X_OFFSET*8, MARKER_SPRITE_Y_OFFSET]

};

var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
});

var bounds = map.getBounds(),
    southWest = bounds.getSW(),
    northEast = bounds.getNE(),
    lngSpan = northEast.lng() - southWest.lng(),
    latSpan = northEast.lat() - southWest.lat();

var markers = [], markersMap = {};
var rectangles = [], colorIndex = 0;

for (var key in MARKER_SPRITE_POSITION) {

    var position = new naver.maps.LatLng(
        southWest.lat() + latSpan * Math.random(),
        southWest.lng() + lngSpan * Math.random());

    var marker = new naver.maps.Marker({
        map: map,
        position: position,
        title: key,
        icon: {
            url: MARKER_ICON_URL,
            size: new naver.maps.Size(24, 37),
            anchor: new naver.maps.Point(12, 37),
            origin: new naver.maps.Point(MARKER_SPRITE_POSITION[key][0], MARKER_SPRITE_POSITION[key][1])
        },
        zIndex: 100
    });
    // 마커 만들기
    markers.push(marker);
    // 마커 저장
    markersMap[key] = marker;
};

naver.maps.Event.addListener(map, 'zoom_changed', function() {
    updateMarkersIntersectState();
});

function updateMarkersIntersectState() {

    var store = getIntersectMarkerStore(markers);
    var intersectMarkers = getMarkersByStore(store);
    var boundsList = getIntersectMarkerBounds(intersectMarkers);

    resetMarkers(markers);
    highlightMarkers(intersectMarkers);

    resetRectangles(rectangles);
    rectangles = drawRectangles(boundsList);
}

function resetRectangles(rectangles) {
    for (var i = 0; i < rectangles.length; i++) {
        rectangles[i].setMap(null);
    }
}

function drawRectangles(boundsList) {

    var rectangles = []

    for (var i = 0; i < boundsList.length; i++) {
        rectangles.push(new naver.maps.Rectangle({
            map: map,
            bounds: boundsList[i],
            strokeColor: COLORS[colorIndex % COLORS.length],
            strokeWeight: 2,
            strokeOpacity: 0.8,
            fillColor: COLORS[colorIndex % COLORS.length],
            fillOpacity: 0.4
        }));
        colorIndex++;
    }

    return rectangles;
}

function getIntersectMarkerStore(markers) {
    // 겹치는 마커 저장소 get
    var store = [];
    var target, checked, targetBounds, checkedBounds;

    for (var i = 0; i < markers.length; i++) {

        target = markers[i];

        for (var j = 0; j < markers.length; j++) {

            checked = markers[j];

            if (target === checked) continue;

            // 마커 범위 측정
            targetBounds = target.getDrawingRect();
            checkedBounds = checked.getDrawingRect();
            if (targetBounds.intersects(checkedBounds)) {
                // 겹치는 마커 있을 시 _interToIntersectStore(저장소, )
                _inertToIntersectStore(store, target.getTitle(), checked.getTitle());
            }
        }
    }

    return store;
}

function getMarkersByStore(store) {

    var intersectMarkers = [];

    for (var i = 0; i < store.length; i++) {

        intersectMarkers[i] = [];

        for (var j = 0; j < store[i].length; j++) {
            intersectMarkers[i].push(markersMap[store[i][j]]);
        }
    }

    return intersectMarkers;
}

function getIntersectMarkerBounds(intersectMarkers) {

    var boundsList = [], bounds;

    for (var i = 0; i < intersectMarkers.length; i++) {

        for (var j = 0; j < intersectMarkers[i].length; j++) {

            if (j === 0) {
                bounds = intersectMarkers[i][j].getDrawingRect();
            } else {
                bounds = bounds.union(intersectMarkers[i][j].getDrawingRect());
            }
        }

        bounds = _pixelBoundsToLatLngBounds(map, bounds);
        boundsList.push(bounds);
    }

    return boundsList;
}

function resetMarkers(markers) {

    for (var i = 0; i < markers.length; i++) {
        var icon = markers[i].getIcon();
        icon.url = MARKER_ICON_URL;
        markers[i].setIcon(icon);
    }
}

function highlightMarkers(intersectMarkers) {

    for (var i = 0; i < intersectMarkers.length; i++) {

        for (var j = 0; j < intersectMarkers[i].length; j++) {

            var icon = intersectMarkers[i][j].getIcon();
            icon.url = MARKER_HIGHLIGHT_ICON_URL;
            intersectMarkers[i][j].setIcon(icon);
        }
    }
}

function _pixelBoundsToLatLngBounds(map, pixelBounds) {

    var zoom = map.getZoom();
    var proj = map.getProjection();

    var min = pixelBounds.getMin();
    var max = pixelBounds.getMax();

    min = proj.scaleDown(min, zoom);
    max = proj.scaleDown(max, zoom);

    min = proj.fromPointToCoord(min);
    max = proj.fromPointToCoord(max);

    return new naver.maps.LatLngBounds(min, max);
}

function _uniqueArray(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
}

function _inertToIntersectStore(store, value1, value2) {

    var index1 = _has(store, value1);
    var index2 = _has(store, value2);

    if (index1 !== -1 && index2 === -1) {
        index2 = index1;
    } else if (index1 === -1 && index2 !== -1) {
        index1 = index2;
    }

    if (index1 === -1 && index2 === -1) {
        store.push([value1, value2]);
    } else {
        store[index1].push(value1);
        store[index2].push(value2);

        if (index1 !== index2) {

            var low = Math.min(index1, index2);
            var high = Math.max(index1, index2);

            store[low] = store[low].concat(store[high]);
            store.splice(high, 1);
            store[low] = _uniqueArray(store[low]);
        } else {

            store[index1] = _uniqueArray(store[index1]);
        }
    }
}

function _has(store, value) {

    var array;

    for (var i = 0; i < store.length; i++) {

        array = store[i];

        if (array.indexOf(value) !== -1) {

            return i;
        }
    }

    return -1;
}