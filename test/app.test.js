const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')

describe('GET /apps endpoint', () => {

    it('should be 400 if sort is incorrect', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be one of app or rating')
    })
    it('Returns an array of app store data when sorted by Rating', () => {
        const query = { sort: "Rating" }
        return request(app)
            .get('/apps')
            .query(query)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1)
                const appItem = res.body[0]
                expect(appItem).to.include.all.keys("App","Category","Rating","Reviews","Size","Installs","Type","Price","Content Rating","Genres","Last Updated","Current Ver","Android Ver")
            })
    })
    it('Returns an array of app store data when sorted by App', () => {
        const query = { sort: "App" }
        return request(app)
            .get('/apps')
            .query(query)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1)
                const appItem = res.body[0]
                expect(appItem).to.include.all.keys("App","Category","Rating","Reviews","Size","Installs","Type","Price","Content Rating","Genres","Last Updated","Current Ver","Android Ver")
            })
    })
    it('Sends an error if a query parameter of genre is supplied but is not a correct parameter', () => {
        return request(app)
            .get('/apps')
            .query({ sort: "App", genre: "Err"})
            .expect(400, 'Genre must be selected from list')
    })
    it('Should return an array of only matching apps when "genre" query parameter indicates genre is "Casual"', () => {
        return request(app)
            .get('/apps')
            .query({ sort: "App", genre: "Casual"})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                const resArr = res.body
                resArr.forEach(appItem => {
                    expect(appItem.Genres).to.equal('Casual')
                })
            })
    })
})