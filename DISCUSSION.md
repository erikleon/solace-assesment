Initial problems to address are react keys missing for lists, type for the advocates, searching on phone number and years experience. TODO: style, move search to db get

Moved search over to the db get but had to modify the schema to make phone numbers more easily searable. Also lost searching on the specialties since seems like would need more work to get it properly working possibly some sort of join.

Some things I would like to do with more time:

- want to be able to add in pagination on the BE and UI.
- breaking out the table and table rows into components with jest tests.
- fix type error on advocate get
- search on the specialties list
- style the specialties as a list that could collapse and expand or just cut off more than 5-7 specialies with a "+ more" chip
