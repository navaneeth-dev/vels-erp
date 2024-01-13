package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("7wdzt32654it192")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("brxwmodu")

		// add
		new_date := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "rgqmt1c3",
			"name": "date",
			"type": "relation",
			"required": true,
			"presentable": true,
			"unique": false,
			"options": {
				"collectionId": "brundc6qzrt6ea4",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_date)
		collection.Schema.AddField(new_date)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("7wdzt32654it192")
		if err != nil {
			return err
		}

		// add
		del_date := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "brxwmodu",
			"name": "date",
			"type": "date",
			"required": true,
			"presentable": true,
			"unique": false,
			"options": {
				"min": "",
				"max": ""
			}
		}`), del_date)
		collection.Schema.AddField(del_date)

		// remove
		collection.Schema.RemoveField("rgqmt1c3")

		return dao.SaveCollection(collection)
	})
}
