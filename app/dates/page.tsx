export default function DatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-left">
      <h1 className="text-3xl font-bold mb-8 text-left">Dublin Date Guide</h1>

      {/* Bars Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-violet-600 text-left">
          Cozy Bars
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border border-default-200 text-left">
            <h3 className="text-xl font-bold mb-2 text-left">Kodiak</h3>
            <p className="text-default-600 mb-2 text-left">
              Rathmines, Dublin 6
            </p>
            <p className="mb-4 text-left">
              A charming neighborhood bar with intimate lighting and cozy
              booths. Known for their craft cocktails and relaxed atmosphere,
              Kodiak offers the perfect setting for getting to know someone.
              Their upstairs area is particularly romantic in the evenings.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-default-200 text-left">
            <h3 className="text-xl font-bold mb-2 text-left">The Lucky Duck</h3>
            <p className="text-default-600 mb-2 text-left">
              Aungier Street, Dublin 2
            </p>
            <p className="mb-4 text-left">
              A beautifully restored Victorian pub with multiple levels. Each
              floor offers a different vibe, from casual drinks at the ground
              floor to intimate cocktails in their upstairs lounges. Perfect for
              both first dates and special occasions.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-default-200 text-left">
            <h3 className="text-xl font-bold mb-2 text-left">
              Vintage Cocktail Club
            </h3>
            <p className="text-default-600 mb-2 text-left">
              Crown Alley, Temple Bar
            </p>
            <p className="mb-4 text-left">
              Hidden behind an unmarked black door, this speakeasy-style bar
              spans three floors of a Victorian building. Known for their
              exceptional cocktails and intimate atmosphere, it's perfect for
              those seeking something special.
            </p>
          </div>
        </div>
      </section>

      {/* Walks Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-violet-600 text-left">
          Scenic Walks
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border border-default-200 text-left">
            <h3 className="text-xl font-bold mb-2 text-left">
              Poolbeg Lighthouse Walk
            </h3>
            <p className="text-default-600 mb-2 text-left">Dublin Port</p>
            <p className="mb-4 text-left">
              A 4km walk along Dublin's Great South Wall to the iconic red
              lighthouse. Offering stunning views of Dublin Bay, the Wicklow
              Mountains, and Howth Head. Particularly romantic at sunset, but
              check tide times before you go.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-default-200 text-left">
            <h3 className="text-xl font-bold mb-2 text-left">Phoenix Park</h3>
            <p className="text-default-600 mb-2 text-left">Dublin 8</p>
            <p className="mb-4 text-left">
              Europe's largest urban park offers multiple romantic walking
              routes. Visit the Victorian People's Flower Gardens, spot the wild
              deer, or climb to the Magazine Fort for city views. The tree-lined
              paths are particularly beautiful in autumn.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-default-200 text-left">
            <h3 className="text-xl font-bold mb-2 text-left">
              Dun Laoghaire Pier
            </h3>
            <p className="text-default-600 mb-2 text-left">Dun Laoghaire</p>
            <p className="mb-4 text-left">
              A classic 2.6km walk along the East Pier, offering sea views and
              fresh air. Stop for a famous Teddy's ice cream and watch the boats
              in the harbour. The renovated Victorian bandstand makes for a
              perfect photo opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-violet-600 text-left">
          Fun Activities
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border border-default-200 text-left">
            <h3 className="text-xl font-bold mb-2 text-left">Flight Club</h3>
            <p className="text-default-600 mb-2 text-left">
              Abbey Street Lower
            </p>
            <p className="mb-4 text-left">
              A modern take on darts with digital scoring and multiple game
              options. Their beautiful interior, sharing plates, and cocktails
              make it perfect for breaking the ice. Book in advance as it's very
              popular for dates.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-default-200 text-left">
            <h3 className="text-xl font-bold mb-2 text-left">Lane7</h3>
            <p className="text-default-600 mb-2 text-left">
              Dundrum Town Centre
            </p>
            <p className="mb-4 text-left">
              A premium bowling experience with arcade games, ping pong, and
              pool tables. The retro-modern design and bar area make it feel
              more grown-up than typical bowling alleys. Perfect for keeping the
              conversation flowing between games.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-default-200 text-left">
            <h3 className="text-xl font-bold mb-2 text-left">Token</h3>
            <p className="text-default-600 mb-2 text-left">Smithfield</p>
            <p className="mb-4 text-left">
              A retro arcade with great food and drinks. Play classic games
              while enjoying craft beers and gourmet burgers. The competitive
              yet casual atmosphere makes it ideal for breaking down first-date
              nerves.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
