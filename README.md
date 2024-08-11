docker run --name dev-openldap-server \
	--env LDAP_ORGANISATION="007NIl" \
	--env LDAP_DOMAIN="sagniksarkar.duckdns.org" \
	--env LDAP_ADMIN_PASSWORD="StrongAdminPassw0rd" \
        --volume /data/slapd/database:/home/nil/Projects/tmp/ldap \
        --volume /data/slapd/config:/home/nil/Projects/tmp/slapd.d \
	--detach osixia/openldap:latest