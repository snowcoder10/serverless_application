import { Client } from 'pg'


export async function ProcessUpload(records: any[], dbConnectionString: string) {
  const client = new Client({ connectionString: dbConnectionString })
  await client.connect()

  for (const record of records) {
    // check to see if the record already exists
    const existingObject = await client.query('SELECT * FROM uploads WHERE name = $1', [record.s3.object.key])
    if (existingObject.rows.length > 0) {
      console.log(`Object ${record.s3.object.key} already exists in the database`)
      continue
    }

    // insert the record into the database
    await client.query('INSERT INTO uploads (key, created_at) VALUES ($1, $2)', [record.s3.object.key, new Date()])
    console.log("Inserted record into the database")
  }
  console.log("Success!")
  await client.end()
}