import { getCardsPage } from "@/app/shared/upstream/swu-official/cards";
import * as fs from "node:fs";

export async function GET() {
    const page = await getCardsPage({});
    console.debug(`Writing /public/cards.1.json`);
    fs.writeFile(`public/cards.1.json`, JSON.stringify(page), () => {});

    for (let i = 2; i <= page.meta.pagination.pageCount; i++) {
        const nextPage = await getCardsPage({ page: i });
        console.debug(`Writing /public/cards.${i}.json`);
        fs.writeFile(
            `public/cards.${i}.json`,
            JSON.stringify(nextPage),
            () => {},
        );
    }

    return Response.json(`Wrote ${page.meta.pagination.pageCount} files`);
}
