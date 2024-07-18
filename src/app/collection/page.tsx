"use client";

import { useRouter } from "next/navigation";

export default function Collection() {
    const router = useRouter();
    router.push("/collection/owned");
}
