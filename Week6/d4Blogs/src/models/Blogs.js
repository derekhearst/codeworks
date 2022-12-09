export class Blog {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.imgUrl = data.imgUrl;
    this.creatorId = data.creatorId;
    this.createdAt = data.createdAt;
    this.published = data.published;
    this.tags = data.tags;
    this.creator = data.creator;
  }
}
