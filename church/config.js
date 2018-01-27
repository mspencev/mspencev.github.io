var config = {
    cutOffDate: new Date('1 Sep 2006'),  //for school
    
    tables:[
        {
            title: 'YM/YW',
            'transitionOnBday': true, //otherwise, transitions based on their age on Jan. 1st
            groups: [
                {'name': 'Deacons/Beehives', 'minAge': 12, 'maxAge': 13},
                {'name': 'Teachers/Mia Maids', 'minAge': 14, 'maxAge': 15},
                {'name': 'Priests/Laurels', 'minAge': 16, 'maxAge': 18}
            ],
            rows:["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]

        },
        {
            title: 'Sunday School',
            'transitionOnBday': false,           
            groups: [
                {'name': 'Youth 1', 'minAge': 12, 'maxAge': 13},
                {'name': 'Youth 2', 'minAge': 14, 'maxAge': 15},
                {'name': 'Youth 3', 'minAge': 16, 'maxAge': 18}
            ],
            rows:["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]
        },
        {
            title: 'Primary',
            'transitionOnBday': false,           
            groups: [
                {'name': 'Sunbeam', 'minAge': 3, 'maxAge': 3},
                {'name': 'CTR 4', 'minAge': 4, 'maxAge': 4},
                {'name': 'CTR 5', 'minAge': 5, 'maxAge': 5},
                {'name': 'CTR 6', 'minAge': 6, 'maxAge': 6},
                {'name': 'CTR 7', 'minAge': 7, 'maxAge': 7},
                {'name': 'Valiant 8', 'minAge': 8, 'maxAge': 8},
                {'name': 'Valiant 9', 'minAge': 9, 'maxAge': 9},
                {'name': 'Valiant 10', 'minAge': 10, 'maxAge': 10},
                {'name': 'Valiant 11', 'minAge': 11, 'maxAge': 11}   
            ],
            rows:["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]
        }
    ],
    
}
    
