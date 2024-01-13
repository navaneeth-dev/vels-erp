package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "brundc6qzrt6ea4",
			"created": "2024-01-13 11:44:03.130Z",
			"updated": "2024-01-13 11:44:03.130Z",
			"name": "working_days",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "8bcfe5cy",
					"name": "date",
					"type": "date",
					"required": true,
					"presentable": true,
					"unique": false,
					"options": {
						"min": "",
						"max": ""
					}
				}
			],
			"indexes": [],
			"listRule": null,
			"viewRule": null,
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("brundc6qzrt6ea4")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
