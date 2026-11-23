import json
from datetime import datetime
import os

from urllib.request import urlopen

from bs4 import BeautifulSoup
from scholarly.author_parser import AuthorParser


class PublicProfilePages:
    """Load the profile and any publication-list pages requested by AuthorParser."""

    def _get_soup(self, path):
        with urlopen("https://scholar.google.com" + path, timeout=30) as response:
            page = BeautifulSoup(response.read(), "html.parser")
        if not page.select_one("#gsc_prf_in"):
            raise ValueError("Google Scholar did not return a public author profile")
        return page


parser = AuthorParser(PublicProfilePages())
author = parser.get_author(os.environ['GOOGLE_SCHOLAR_ID'])
parser.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
# New Scholar profiles can list papers before displaying a citation summary.
if 'citedby' not in author:
    if any(paper['num_citations'] for paper in author['publications']) or any(author['cites_per_year'].values()):
        raise ValueError('Citation summary missing for a profile with recorded citations')
    author['citedby'] = 0
author['updated'] = str(datetime.now())
author['publications'] = {v['author_pub_id']:v for v in author['publications']}
print(f"Fetched {author['name']}: {len(author['publications'])} publications, {author['citedby']} citations")
os.makedirs('results', exist_ok=True)
with open(f'results/gs_data.json', 'w') as outfile:
    json.dump(author, outfile, ensure_ascii=False)

shieldio_data = {
  "schemaVersion": 1,
  "label": "citations",
  "message": f"{author['citedby']}",
}
with open(f'results/gs_data_shieldsio.json', 'w') as outfile:
    json.dump(shieldio_data, outfile, ensure_ascii=False)
