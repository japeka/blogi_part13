describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
    cy.contains('login')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Overall tests', function () {
    beforeEach(function () {
      const user = {
        name: 'Nanna Suvinen',
        username: 'nannav',
        password: 'salainen',
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('login succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('nannav')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Nanna Suvinen logged in')
    })

    it('login fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('nannav')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(166, 9, 9)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Nanna Suvinen logged in')
    })

    describe('Various blog app related tests', function () {
      describe('When user logged in', function () {
        beforeEach(function () {
          cy.login({ username: 'nannav', password: 'salainen' })
        })

        it('A blog can be created', function () {
          cy.contains('new blog').click()
          cy.get('#blogTitle').type('new blog test1')
          cy.get('#blogAuthor').type('patrick blom')
          cy.get('#blogUrl').type('http://pblom.fi')

          cy.get('#blogCreate').click()
          cy.contains('new blog test1')
        })

        describe('the blog can liked', function () {
          beforeEach(function () {
            cy.createBlog({
              title: 'helloworld blog1',
              author: 'maria heino',
              url: 'http://maria.heino.fi',
            })
          })

          it('can be added to newly created blog', function () {
            cy.contains('helloworld blog1')
              .parent()
              .find('button')
              .as('theButton')
            cy.get('@theButton').click()

            cy.get('.likes').contains('# 0')
            cy.get('.blogLikes').click()
            cy.get('.likes').contains('# 1')
          })
        })

        describe('blog removals', function () {
          beforeEach(function () {
            cy.createBlog({
              title: 'helloworld blog1',
              author: 'maria heino',
              url: 'http://maria.heino.fi',
            })
          })

          it('can be removed by user who created the blog', function () {
            cy.contains('helloworld blog1')
              .parent()
              .find('button')
              .as('theButton')
            cy.get('@theButton').click()
            cy.get('#blogRemove').click()
            cy.get('body').should('not.have.value', 'helloworld blog1')
          })

          describe('cannot be removed by user who didnt create the blog', function () {
            beforeEach(function () {
              const user = {
                name: 'Hanna Suvinen',
                username: 'hannav',
                password: 'salainen',
              }
              cy.request('POST', 'http://localhost:3003/api/users/', user)
            })

            it('another user logs in and tries to remove blog created by another person', function () {
              cy.login({ username: 'hannav', password: 'salainen' })
              cy.contains('helloworld blog1')
                .parent()
                .find('button')
                .as('theButton')
              cy.get('@theButton').click()
              cy.get('#blogRemove').click()
              cy.get('.error').should(
                'contain',
                'deletion can be only performed by user who created the blog'
              )
            })
          })
          describe('figure out correct order of blogs by their likes #, do some resets first, adding initial blogs', function () {
            beforeEach(function () {
              cy.request('POST', 'http://localhost:3003/api/testing/reset')
              cy.logout()
              const user = {
                name: 'Hanna Suvinen',
                username: 'hannav',
                password: 'salainen',
              }
              cy.request('POST', 'http://localhost:3003/api/users/', user)
              cy.login({ username: user.username, password: user.password })
              cy.createBlog({
                title: 'helloworld blog1',
                author: 'maria heino',
                url: 'http://maria.heino.fi',
                likes: Math.floor(Math.random()*20),
              })
              cy.createBlog({
                title: 'helloworld blog2',
                author: 'maria heino',
                url: 'http://maria.heino.fi',
                likes: Math.floor(Math.random()*20),
              })
            })

            it('verify that blog with most likes predeces the blog with less likes', function () {
              cy.contains('helloworld blog1')
                .parent()
                .find('button')
                .as('theButton1')
              cy.get('@theButton1').click()

              cy.contains('helloworld blog2')
                .parent()
                .find('button')
                .as('theButton2')
              cy.get('@theButton2').click()


              //countLikes span element has the likes count
              cy.get('span.countLikes')
                .eq(0)
                .invoke('text')
                .then((num0) => { // get count of 1st blog's likes
                  const firstLikes = Number(num0)
                  cy.get('span.countLikes')
                    .eq(1)
                    .invoke('text')
                    .then((secondLikes) => { //get count of 2nd blog's likes
                      //likes of 1st blog should be greater or equal to one last in the list
                      cy.wrap(firstLikes).should('be.gte', Number(secondLikes))
                    })
                })
            })
          })
        })
      })
    })
  })
})
