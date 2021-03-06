class DealGroups {
  constructor(client) {
    this.client = client
  }

  getAll(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/properties/v1/deals/groups',
      qs: options,
    })
  }

  get(options) {
    return this.getAll(options)
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/properties/v1/deals/groups',
      body: data,
    })
  }

  update(name, data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/properties/v1/deals/groups/named/${name}`,
      body: data,
    })
  }

  delete(groupName) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/properties/v1/deals/groups/named/${groupName}`,
    })
  }

  upsert(data) {
    return this.create(data).catch((err) => {
      if (err.statusCode === 409) {
        // if 409, the property group already exists, update it
        return this.update(data.name, data)
      } else {
        throw err
      }
    })
  }
}

module.exports = DealGroups
