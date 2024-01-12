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
			"id": "74dnrlb1v62jw2q",
			"created": "2024-01-12 11:35:05.866Z",
			"updated": "2024-01-12 11:35:05.866Z",
			"name": "timetable",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "vfom3ikg",
					"name": "field",
					"type": "url",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"exceptDomains": null,
						"onlyDomains": null
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

		collection, err := dao.FindCollectionByNameOrId("74dnrlb1v62jw2q")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
