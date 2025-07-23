import { QueryClient } from "@tanstack/react-query";
import { prefetchPassions } from "@/shared/api/queries/use-passions";

export const queryClient = new QueryClient();

prefetchPassions();
