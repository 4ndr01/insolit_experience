import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        if (status === "loading") {
            return <p>Loading...</p>; // Gestion du chargement de la session
        }

        // Vérifier si l'utilisateur est autorisé en fonction de la session
        const isAuthorized = session && allowedRoles.includes(session.user.role);

        if (!isAuthorized) {
            // Rediriger vers une page non autorisée si l'accès est refusé
            router.push("/unauthorized");
            return null; // Retourner null pour éviter le rendu du composant
        }

        // Rendre le composant enveloppé si l'utilisateur est autorisé
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
