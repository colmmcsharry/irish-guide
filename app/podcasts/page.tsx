export default function PodcastsPage() {
  return (
    <div className="max-w-4xl text-left px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-left">Podcasts</h1>

      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-violet-400">Dublin</h2>
          <p className="text-lg text-default-600 mb-4 leading-relaxed">
            Ireland has many dating-related podcasts. Here are some of the best
          </p>
        </div>

        <ul className="space-y-3">
          <li className="text-lg">
            <a
              className="text-blue-300 hover:text-blue-500 transition-colors"
              href="https://www.datersgonna.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Daters Gonna Date
            </a>
          </li>
          <li className="text-lg">
            <a
              className="text-blue-300 hover:text-blue-500 transition-colors"
              href="https://www.datingpodcast.ie/"
              rel="noopener noreferrer"
              target="_blank"
            >
              The Dating Orange podcast
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
